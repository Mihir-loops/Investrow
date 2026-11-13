import { Icon } from "./Icon";

/**
 * Auto-scrolling testimonial marquee.
 * The list is rendered twice; a CSS transform loop slides the first copy out
 * to the right while the second copy takes its place, so the row loops
 * seamlessly. Duplicated cards are hidden from assistive tech. The track
 * pauses on hover so people can read a card in full, and falls back to a
 * static row under prefers-reduced-motion (see components.css).
 */
export function Testimonials({
  items,
}: {
  items: { name: string; quote: string }[];
}) {
  const loop = [...items, ...items];

  return (
    <div className="testimonials">
      <div className="testimonials__window">
        <div className="testimonials__track" aria-label="What clients say">
          {loop.map((item, index) => (
            <figure
              className="testimonial"
              key={`${item.name}-${index}`}
              aria-hidden={index >= items.length ? "true" : undefined}
            >
              <Icon name="arrowUpRight" size={18} className="testimonial__mark" />
              <blockquote>
                <p>“{item.quote}”</p>
              </blockquote>
              <figcaption>
                <span className="testimonial__avatar" aria-hidden="true">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <small>Client</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="testimonials__note">
        Reproduced from Investrow&apos;s public website. Star ratings are not
        shown because they could not be verified from the source capture.
      </p>
    </div>
  );
}
