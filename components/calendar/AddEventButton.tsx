'use client';

import { Button } from '@/components/ui/button';

interface AddEventButtonProps {
  onClick: () => void;
}

export const AddEventButton = ({ onClick }: AddEventButtonProps) => {
  return (
    <div className="flex justify-center mt-8 mb-6">
      <Button className="px-6 py-3 text-lg" onClick={onClick}>
        依頼登録
      </Button>
    </div>
  );
};