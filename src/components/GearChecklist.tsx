import React, { useState } from 'react';
import { GearItem } from '../types';
import { Check, Star, Weight, StickyNote, ChevronDown, ChevronUp } from 'lucide-react';

interface GearChecklistProps {
  gearList: GearItem[];
  onTogglePacked: (gearId: string) => void;
  onUpdateItem?: (gearId: string, updates: Partial<GearItem>) => void;
  readOnly?: boolean;
}

export default function GearChecklist({ gearList, onTogglePacked, onUpdateItem, readOnly = false }: GearChecklistProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const categories = [...new Set(gearList.map(item => item.category))];

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleNoteEdit = (item: GearItem) => {
    setEditingNotes(item.id);
    setNoteText(item.notes || '');
  };

  const handleNoteSave = (gearId: string) => {
    if (onUpdateItem) {
      onUpdateItem(gearId, { notes: noteText });
    }
    setEditingNotes(null);
  };

  const getCategoryStats = (category: string) => {
    const items = gearList.filter(item => item.category === category);
    const packed = items.filter(item => item.packed).length;
    const total = items.length;
    const weight = items.reduce((sum, item) => sum + (item.weight || 0), 0);
    return { packed, total, weight };
  };

  return (
    <div className="space-y-4">
      {categories.map(category => {
        const stats = getCategoryStats(category);
        const isExpanded = expandedCategories.has(category);
        const categoryItems = gearList.filter(item => item.category === category);

        return (
          <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-150 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                <span className="text-sm text-gray-600">
                  {stats.packed}/{stats.total}
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {(stats.weight / 1000).toFixed(2)} kg
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </div>
            </button>

            {isExpanded && (
              <div className="p-4 space-y-2">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      item.packed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <button
                          onClick={() => !readOnly && onTogglePacked(item.id)}
                          disabled={readOnly}
                          className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                            item.packed
                              ? 'bg-primary-600 border-primary-600'
                              : 'border-gray-300 hover:border-primary-500'
                          } ${readOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        >
                          {item.packed && <Check className="h-4 w-4 text-white" />}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${item.packed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {item.name}
                            </span>
                            {item.essential && (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>

                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            {item.weight && (
                              <div className="flex items-center space-x-1">
                                <Weight className="h-3 w-3" />
                                <span>{item.weight}g</span>
                              </div>
                            )}
                            {item.essential && (
                              <span className="text-yellow-600 font-medium">Essential</span>
                            )}
                          </div>

                          {editingNotes === item.id ? (
                            <div className="mt-2 space-y-2">
                              <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                rows={2}
                                placeholder="Add notes..."
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleNoteSave(item.id)}
                                  className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingNotes(null)}
                                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {item.notes && (
                                <p className="mt-2 text-sm text-gray-600 italic">{item.notes}</p>
                              )}
                              {!readOnly && onUpdateItem && (
                                <button
                                  onClick={() => handleNoteEdit(item)}
                                  className="mt-2 flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                                >
                                  <StickyNote className="h-3 w-3" />
                                  <span>{item.notes ? 'Edit note' : 'Add note'}</span>
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
