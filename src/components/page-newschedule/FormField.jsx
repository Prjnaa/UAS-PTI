const FormField = ({ label, type = 'text', placeholder, value, onChange, textarea = false, rows = 1 }) => {
  return (
    <div className="mb-4">
      <label htmlFor={label.toLowerCase().replace(/\s/g, '')} className="block mb-2 font-medium text-lyellow">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={label.toLowerCase().replace(/\s/g, '')}
          className="w-full p-2 border border-gray-300 rounded resize-none"
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          type={type}
          id={label.toLowerCase().replace(/\s/g, '')}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default FormField;