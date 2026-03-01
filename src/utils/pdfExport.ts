import jsPDF from 'jspdf';
import { Trip, GearItem } from '../types';
import { format } from 'date-fns';

export function exportTripToPDF(trip: Trip): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('TrailPack - Trip Checklist', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  doc.text(`Trip: ${trip.name}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Destination: ${trip.destination}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Dates: ${format(new Date(trip.startDate), 'MMM dd, yyyy')} - ${format(new Date(trip.endDate), 'MMM dd, yyyy')}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Terrain: ${trip.terrain.charAt(0).toUpperCase() + trip.terrain.slice(1)}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Season: ${trip.season.charAt(0).toUpperCase() + trip.season.slice(1)}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Group Size: ${trip.groupSize} ${trip.groupSize === 1 ? 'person' : 'people'}`, 20, yPosition);
  
  if (trip.weatherData) {
    yPosition += 7;
    doc.text(`Weather: ${trip.weatherData.temperature}°C, ${trip.weatherData.condition}`, 20, yPosition);
  }
  
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Gear Checklist', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  
  const categories = [...new Set(trip.gearList.map(item => item.category))];
  
  categories.forEach(category => {
    const categoryItems = trip.gearList.filter(item => item.category === category);
    
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text(category, 20, yPosition);
    yPosition += 6;
    
    doc.setFont('helvetica', 'normal');
    categoryItems.forEach(item => {
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.rect(20, yPosition - 3, 4, 4);
      if (item.packed) {
        doc.text('✓', 20.5, yPosition);
      }
      
      const itemText = `${item.name}${item.essential ? ' *' : ''}`;
      doc.text(itemText, 28, yPosition);
      
      if (item.weight) {
        doc.text(`${item.weight}g`, pageWidth - 30, yPosition);
      }
      
      yPosition += 6;
    });
    
    yPosition += 4;
  });
  
  const totalWeight = trip.gearList.reduce((sum, item) => sum + (item.weight || 0), 0);
  const packedWeight = trip.gearList
    .filter(item => item.packed)
    .reduce((sum, item) => sum + (item.weight || 0), 0);
  
  if (yPosition > 260) {
    doc.addPage();
    yPosition = 20;
  }
  
  yPosition += 10;
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Weight: ${(totalWeight / 1000).toFixed(2)} kg`, 20, yPosition);
  yPosition += 6;
  doc.text(`Packed Weight: ${(packedWeight / 1000).toFixed(2)} kg`, 20, yPosition);
  yPosition += 6;
  doc.text(`Packed Items: ${trip.gearList.filter(i => i.packed).length} / ${trip.gearList.length}`, 20, yPosition);
  
  yPosition += 10;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.text('* Essential items', 20, yPosition);
  
  const fileName = `${trip.name.replace(/\s+/g, '_')}_checklist.pdf`;
  doc.save(fileName);
}
