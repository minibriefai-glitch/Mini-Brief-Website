import { Check, Minus } from "lucide-react";
import { different } from "@/content/home";
import { Section } from "./section";
import { SectionHeader } from "./section-header";

/**
 * Side by side. A real table for assistive tech, with explicit table roles
 * so the semantics survive the phone layout, where each row is a stacked
 * card with the column names repeated per cell.
 */
export function Different() {
  return (
    <Section>
      <SectionHeader eyebrow={different.eyebrow} title={different.h2} />
      <div className="mt-14 overflow-hidden rounded-2xl border border-brand-ink/10 bg-white shadow-card">
        <table role="table" className="w-full border-collapse text-left">
          <caption className="sr-only">{`${different.columns.us} compared with ${different.columns.usual.toLowerCase()}`}</caption>
          <thead role="rowgroup" className="hidden md:table-header-group">
            <tr role="row" className="border-b border-brand-ink/10 text-xs font-medium uppercase tracking-wider text-brand-muted-text">
              <th role="columnheader" scope="col" className="px-6 py-4 font-medium">
                <span className="sr-only">What</span>
              </th>
              <th role="columnheader" scope="col" className="px-6 py-4 font-medium">
                {different.columns.usual}
              </th>
              <th role="columnheader" scope="col" className="px-6 py-4 font-medium text-brand-blue">
                {different.columns.us}
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup" className="divide-y divide-brand-ink/10">
            {different.rows.map((row) => (
              <tr key={row.label} role="row" className="grid gap-3 p-6 md:table-row md:p-0">
                <th role="rowheader" scope="row" className="text-lg font-semibold text-brand-ink md:w-1/4 md:px-6 md:py-5 md:align-top md:text-base">
                  {row.label}
                </th>
                <td role="cell" className="text-base text-brand-muted-text md:px-6 md:py-5 md:align-top">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider md:hidden">{different.columns.usual}</span>
                  <span className="flex gap-2">
                    <Minus className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    {row.usual}
                  </span>
                </td>
                <td role="cell" className="text-base text-brand-ink md:px-6 md:py-5 md:align-top">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-brand-blue md:hidden">{different.columns.us}</span>
                  <span className="flex gap-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" strokeWidth={2.5} />
                    {row.us}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
