const fs = require('fs');
const path = require('path');

const dashboardDir = path.join(__dirname, '../apps/web/src/app/(dashboard)');

// Các mẫu giao diện (Archetypes)
const generateWireframePage = (moduleName, title, type) => {
  const componentName = moduleName.replace(/[^a-zA-Z0-9]/g, '') + 'Page';
  
  if (type === 'list') {
    return `'use client';

import React from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { DataTable, Column } from '@/components/dashboard/DataTable';

export default function ${componentName}() {
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
        title="${title}" 
        description="Quản lý và theo dõi ${title.toLowerCase()}."
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
}`;
  }

  if (type === 'grid') {
    return `'use client';

import React from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';

export default function ${componentName}() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 grayscale">
      <PageHeader 
        title="${title}" 
        description="Khám phá và tương tác với các ${title.toLowerCase()}."
      />

      <div className="flex gap-4 mb-8 border-b border-slate-200 pb-4">
        <div className="h-10 w-64 bg-slate-100 rounded-xl border border-slate-200" />
        <div className="h-10 w-32 bg-slate-100 rounded-xl border border-slate-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="h-40 bg-slate-200 w-full" />
            <div className="p-5">
              <div className="h-3 w-1/3 bg-slate-200 rounded mb-3" />
              <div className="h-5 w-3/4 bg-slate-800 rounded mb-4" />
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 w-1/2 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`;
  }

  if (type === 'settings') {
    return `'use client';

import React from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';

export default function ${componentName}() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 grayscale">
      <PageHeader 
        title="${title}" 
        description="Cấu hình ${title.toLowerCase()} của hệ thống."
      >
        <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl transition-all">
          Lưu thay đổi
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={\`h-10 w-full rounded-xl \${i === 1 ? 'bg-slate-200' : 'bg-transparent'}\`} />
          ))}
        </div>
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="h-6 w-1/3 bg-slate-800 rounded mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i}>
                  <div className="h-4 w-1/4 bg-slate-300 rounded mb-2" />
                  <div className="h-10 w-full bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  }

  // Default: Analytics/Chart layout
  return `'use client';

import React from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';

export default function ${componentName}() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 grayscale">
      <PageHeader 
        title="${title}" 
        description="Báo cáo và thống kê về ${title.toLowerCase()}."
      >
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl transition-all">
          Xuất báo cáo
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <div className="h-4 w-24 bg-slate-200 rounded mb-4" />
            <div className="h-8 w-16 bg-slate-800 rounded" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-[400px] flex flex-col">
           <div className="h-5 w-40 bg-slate-800 rounded mb-6" />
           <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl w-full" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-[400px] flex flex-col">
           <div className="h-5 w-32 bg-slate-800 rounded mb-6" />
           <div className="flex-1 bg-slate-50 border border-slate-100 rounded-full w-full" />
        </div>
      </div>
    </div>
  );
}`;
};

const formatTitle = (str) => {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const determineType = (filePath) => {
  const p = filePath.toLowerCase();
  if (p.includes('analytics') || p.includes('report') || p.includes('results') || p.includes('insights')) return 'chart';
  if (p.includes('settings') || p.includes('profile') || p.includes('audit')) return 'settings';
  if (p.includes('courses') || p.includes('certificates') || p.includes('campaigns')) return 'grid';
  return 'list';
};

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (file === 'page.tsx') {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync(dashboardDir);

let count = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('FeaturePlaceholder')) {
    // Determine module name and title from path
    const relativePath = path.relative(dashboardDir, file);
    const parts = relativePath.split(path.sep); // e.g. ['org', 'recruitment', 'shortlist', 'page.tsx']
    
    // Title is usually the folder name
    const moduleName = parts.slice(1, -1).join('_'); // recruitment_shortlist
    const titleRaw = parts[parts.length - 2]; // shortlist
    const title = formatTitle(titleRaw);
    
    const type = determineType(relativePath);
    
    const newContent = generateWireframePage(moduleName, title, type);
    
    fs.writeFileSync(file, newContent, 'utf8');
    console.log("Generated Wireframe (" + type + ") for " + relativePath);
    count++;
  }
});

console.log("Successfully generated " + count + " wireframe pages.");
