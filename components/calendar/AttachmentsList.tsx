import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AttachmentsListProps {
  files: File[];
  onRemove: (file: File) => void;
  isReadOnly?: boolean;
}

export function AttachmentsList({ files, onRemove, isReadOnly }: AttachmentsListProps) {
  if (files.length === 0) return null;

  return (
    <div className="col-span-4">
      <p className="font-semibold mb-2">添付ファイル:</p>
      <ul className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
        {files.map((file, index) => (
          <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded text-sm">
            <span className="truncate max-w-[200px]">{file.name}</span>
            {!isReadOnly && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(file)}
                className="ml-2 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}