'use client';

import React from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { DataTable, Column } from '@/components/dashboard/DataTable';

export default function verificationverifyPage() {
  const columns: Column<any>[] = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Tên', accessorKey: 'name' },
    { header: 'Trạng thái', accessorKey: 'status' },
    { header: 'Ngày tạo', accessorKey: 'date' },
  ];

  const mockData = [
    { id: '1', name: 'Dữ liệu mẫu 1', status: 'Hoạt động', date: '2024-01-01' },
    { id: '2', name: 'Dữ liệu mẫu 2', status: 'Tạm dừng', date: '2024-01-02' },
    { id: '3', name: 'Dữ liệu mẫu 3', status: 'Hoàn thành', date: '2024-01-03' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 grayscale">
      <PageHeader 
        title="Verify" 
        description="Quản lý và theo dõi verify."
      >
        <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl transition-all">
          Thêm mới
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="h-4 w-24 bg-slate-200 rounded mb-4" />
            <div className="h-8 w-16 bg-slate-300 rounded" />
          </div>
        ))}
      </div>

      <DataTable 
        data={mockData} 
        columns={columns} 
        searchPlaceholder="Tìm kiếm..."
      />
    </div>
  );
}