import { useMemo, useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import Navbar from './components/Navbar';
import ScrollReveal from './components/ScrollReveal';

// Mock data representing FastAPI extracted product catalog
const MOCK_DATA = [
  { id: '1', name: 'Industrial Servo Motor 5kW', category: 'Motors', confidence: 98, status: 'Validated' },
  { id: '2', name: 'Heavy Duty Conveyor Belt 10m', category: 'Logistics', confidence: 95, status: 'Validated' },
  { id: '3', name: 'Hydraulic Press 50T', category: 'Machinery', confidence: 82, status: 'Review' },
  { id: '4', name: 'CNC Milling Cutter Set', category: 'Tools', confidence: 99, status: 'Validated' },
  { id: '5', name: 'Pneumatic Actuator Valve', category: 'Valves', confidence: 60, status: 'Failed' },
];

export default function Catalog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API fetch from FastAPI
  useEffect(() => {
    setTimeout(() => {
      setData(MOCK_DATA);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Product Name' },
      { accessorKey: 'category', header: 'Category' },
      { 
        accessorKey: 'confidence', 
        header: 'AI Confidence',
        cell: (info) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ flex: 1, height: '4px', background: 'var(--bg-void)', borderRadius: '2px' }}>
              <div style={{ 
                width: `${info.getValue()}%`, 
                height: '100%', 
                background: info.getValue() > 90 ? 'var(--success)' : info.getValue() > 70 ? 'var(--warning)' : 'var(--error)' 
              }} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{info.getValue()}%</span>
          </div>
        )
      },
      { 
        accessorKey: 'status', 
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          let color = 'var(--text-muted)';
          if (status === 'Validated') color = 'var(--success)';
          if (status === 'Review') color = 'var(--warning)';
          if (status === 'Failed') color = 'var(--error)';
          
          return (
            <span style={{ 
              color, 
              border: `1px solid ${color}`, 
              padding: '2px 6px', 
              borderRadius: '2px', 
              fontSize: '0.75rem',
              textTransform: 'uppercase'
            }}>
              {status}
            </span>
          );
        }
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Navbar />
      <section className="section section--deep" style={{ minHeight: '100vh', paddingTop: '8rem' }}>
        <div className="container">
          <ScrollReveal>
            <p className="section__label">Database</p>
            <h1 className="section__title">Product Catalog</h1>
            <p className="section__desc" style={{ marginBottom: '2rem' }}>
              Structured, commerce-ready data extracted by Forge Intelligence.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {loading ? (
              <div style={{ color: 'var(--text-muted)' }}>Loading records from FastAPI...</div>
            ) : (
              <div style={{ 
                background: 'var(--bg-surface)', 
                border: '1px solid var(--text-ghost)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id} style={{ borderBottom: '1px solid var(--text-ghost)', background: 'var(--bg-void)' }}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id} style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id} style={{ borderBottom: '1px solid oklch(45% 0.01 55 / 0.1)', transition: 'background 0.2s' }}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
