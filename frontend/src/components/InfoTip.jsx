import { useId, useState } from "react";

export default function InfoTip({ label, children }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return <span className="info-tip" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
    <button type="button" className="info-button" aria-label={`About ${label}`} aria-expanded={open}
      aria-describedby={open ? id : undefined} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      onClick={() => setOpen(value => !value)} onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>i</button>
    {open && <span role="tooltip" id={id} className="tip-bubble">{children}</span>}
  </span>;
}
