import { useDropzone } from "react-dropzone";
import { useState } from "react";

type SetupDropzoneProps = {
  label: string;
  file: File | null;
  onFileSelected: (file: File) => void;
  onRemove: () => void;
};

export default function FileDropzone({
  label,
  file,
  onFileSelected,
  onRemove,
}: SetupDropzoneProps) {
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (files) => {
      if (files.length === 0) return;

      const file = files[0];
      const isValid = file.name.endsWith(".htm");

      if (!isValid) {
        setError("Invlaid file type. Please upload a .htm file.");
        return;
      }

      setError(null);
      onFileSelected(file);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative
        surface
        border
        rounded-lg
        p-6
        w-72 h-72
        flex flex-col
        justify-center
        items-center
        text-center
        cursor-pointer
        transition-all duration-150

        hover:border-accent
        hover:shadow-sm

        ${error ? "border-red-500 bg-red-500/5" : ""}
        ${!error && file ? "border-green-400/60 bg-green-500/10" : ""}
      `}
    >
      <input {...getInputProps()} />

      {/* remove button */}
      {file && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="
          absolute top-2 right-2
          text-xs
          px-2 py-1
          rounded-md
          bg-red-500/10
          text-red-400
          hover:bg-red-500/20
          active:scale-95
          transition
        "
        >
          ✕
        </button>
      )}

      {/* label */}
      <p className="text-heading font-semibold mb-3">{label}</p>

      {/* content */}
      <div className="flex flex-col items-center justify-center gap-2">
        {error ? (
          <p className="text-red-400 text-sm font-medium">{error}</p>
        ) : file ? (
          <p className="text-muted text-sm break-all">{file.name}</p>
        ) : (
          <>
            <p className="text-muted text-sm">Drag & drop your .htm file</p>
            <p className="text-muted text-xs">or click to browse</p>
          </>
        )}
      </div>
    </div>
  );
}
