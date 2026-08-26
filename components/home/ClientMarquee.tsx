import React from "react";
import { profile } from "@/data/profile";

export default function ClientMarquee() {
  return (
    <section className="py-16 md:py-24 border-y border-border-subtle bg-surface/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-gold">
            Selected Collaborations
          </span>
          <h2 className="font-serif text-xl md:text-2xl text-text-primary mt-1 font-light">
            Brands & Production Partners
          </h2>
        </div>
        <p className="font-mono text-xs text-text-muted">
          Commercials • Narrative • Music Videos
        </p>
      </div>

      {/* Client Logos Ticker */}
      <div className="relative w-full overflow-hidden whitespace-nowrap py-2">
        {/* Left/Right Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-12 md:gap-20 animate-marquee">
          {[...profile.clients, ...profile.clients, ...profile.clients].map(
            (client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex items-center gap-6 text-text-muted hover:text-text-primary transition-colors cursor-default"
              >
                <span className="font-serif text-xl md:text-2xl tracking-widest font-light uppercase opacity-60 hover:opacity-100 hover:text-accent-gold-light transition-all">
                  {client.name}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
