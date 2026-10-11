'use client';

import React from 'react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: React.ReactNode;
}

export function DataTable<T>({ data, columns, searchPlaceholder = "Tìm kiếm...", onSearch, actions }: DataTableProps<T>) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <button className="p-2 border border-slate-200 bg-white rounded-xl text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Lọc</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50/80 text-slate-500 font-medium border-b border-slate-100">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-500">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            ) : (
              data.map((item, rowIdx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: rowIdx * 0.05 }}
                  key={rowIdx} 
                  className="bg-white hover:bg-slate-50/80 transition-colors group"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`px-6 py-4 ${col.className || ''}`}>
                      {col.cell ? col.cell(item) : String((item as any)[col.accessorKey])}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md opacity-0 group-hover:opacity-100 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-sm text-slate-500">
        <div>Hiển thị <span className="font-medium text-slate-900">{data.length}</span> kết quả</div>
        <div className="flex gap-1">
          <button className="px-3 py-1.5 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50">Trước</button>
          <button className="px-3 py-1.5 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 transition-colors">Tiếp</button>
        </div>
      </div>
    </div>
  );
}
