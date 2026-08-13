function Field({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xl font-medium text-grey-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-grey-800">{value || '—'}</span>
    </div>
  );
}

export default Field;
