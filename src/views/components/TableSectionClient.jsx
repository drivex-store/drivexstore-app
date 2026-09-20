"use client";
import { useRef } from "react"; 
import { gsap, ScrollTrigger } from "@libs/vendor";
import { useIdleGSAP } from "@hooks/useIdleGSAP"; 
import { ScrollAnimatedHeadline } from "@animations/components/ScrollAnimatedHeadline"; 
import { SanityRichText } from "@libs/sanity/components/SanityRichText"; 
import { SanityButton } from "@libs/sanity/components/SanityButton"; 
import { cx } from "@libs/vendor";

export function TableSectionClient({
  headline,
  headlineDisplay,
  text,
  button,
  columns,
  rows,
  tableTheme,
  highlightTheme,
  hasHighlightedColumn,
}) {
  const containerRef = useRef(null);
  const leftColumnRef = useRef(null);
  const tableWrapperRef = useRef(null);

  useIdleGSAP(
    () => {
      if (containerRef.current) {
        if (leftColumnRef.current) {
          const animateLeftElements = leftColumnRef.current.querySelectorAll("[data-animate-left]");
          if (animateLeftElements.length > 0) {
            gsap.fromTo(
              animateLeftElements,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }
        }
        
        if (tableWrapperRef.current) {
          const rowElements = tableWrapperRef.current.querySelectorAll("[data-table-row]");
          if (rowElements.length > 0) {
            gsap.fromTo(
              rowElements,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.08,
                scrollTrigger: {
                  trigger: tableWrapperRef.current,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }
        }
      }
    },
    { scope: containerRef }
  );

  const tableWrapperClassName = cx(
    "grid-span-12 lg:grid-start-5 lg:grid-span-8 p-16 lg:pb-16",
    hasHighlightedColumn && "pb-0"
  );

  return (
    <div ref={containerRef} className="grid-container">
      <div className="grid-layout items-start gap-y-32">
        
        {/* Left Content Column */}
        <div
          ref={leftColumnRef}
          className="grid-span-12 lg:grid-span-3 flex h-full flex-col gap-24"
        >
          <ScrollAnimatedHeadline headline={headline} displayAs={headlineDisplay} />
          {text && (
            <div data-animate-left={true} className="text-foreground-muted">
              <SanityRichText value={text} />
            </div>
          )}
          {button && (
            <div data-animate-left={true} className="mt-auto">
              <SanityButton button={button} />
            </div>
          )}
        </div>

        {/* Right Table Column */}
        <div
          ref={tableWrapperRef}
          data-theme={tableTheme}
          className={tableWrapperClassName}
        >
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <table className="w-full border-collapse text-body-sm">
              <thead>
                <tr data-table-row={true}>
                  <th className="border-border border-b bg-background px-16 py-12 text-left text-accent-sm" />
                  {columns.map((col) => (
                    <th
                      key={col._key}
                      data-theme={col.highlight ? highlightTheme : undefined}
                      className="border-border border-b bg-background px-16 py-12 text-left font-mono text-accent-sm uppercase"
                    >
                      <span className="flex items-center gap-8">
                        {col.highlight && (
                          <span
                            className="size-12 animate-pulse bg-brand"
                            aria-hidden="true"
                          />
                        )}
                        {col.title}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => {
                  const isLastRow = rowIndex === rows.length - 1;
                  return (
                    <tr data-table-row={true} key={row._key}>
                      <td
                        className={`bg-background px-16 py-12 font-mono text-accent-sm text-foreground-muted uppercase ${
                          isLastRow ? "" : "border-border border-b"
                        }`}
                      >
                        {row.category}
                      </td>
                      {row.values.map((val, valIndex) => {
                        const col = columns[valIndex];
                        return (
                          <td
                            key={`${row._key}-${valIndex}`}
                            data-theme={col?.highlight ? highlightTheme : undefined}
                            className={`bg-background px-16 py-12 ${
                              isLastRow ? "" : "border-border border-b"
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile List View */}
          <div className="flex flex-col lg:hidden">
            {rows.map((row, rowIndex) => (
              <div
                key={row._key}
                data-table-row={true}
                className={`pt-16 ${rowIndex === rows.length - 1 ? "pb-0" : ""}`}
              >
                <p className="mb-12 text-body-sm text-foreground">{row.category}</p>
                <div className="-mx-12 flex flex-col">
                  {row.values.map((val, valIndex) => {
                    const col = columns[valIndex];
                    const isHighlighted = col?.highlight;
                    
                    return (
                      <div
                        key={`${row._key}-${valIndex}`}
                        data-theme={isHighlighted ? highlightTheme : undefined}
                        className={`flex items-baseline justify-between gap-16 px-12 py-6 ${
                          isHighlighted ? "-mx-4 bg-surface px-16 py-8" : ""
                        }`}
                      >
                        <span className="shrink-0 font-mono text-[10px] text-foreground-muted uppercase">
                          {col?.title}
                        </span>
                        <span className="text-right text-body-sm">{val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
