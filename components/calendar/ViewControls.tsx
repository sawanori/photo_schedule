import { Button } from '@/components/ui/button';
import { View } from 'react-big-calendar';

interface ViewControlsProps {
  view: View;
  onViewChange: (view: View) => void;
}

export function ViewControls({ view, onViewChange }: ViewControlsProps) {
  return (
    <div className="mb-6 flex justify-center space-x-4">
      <Button onClick={() => onViewChange('month')} variant={view === 'month' ? 'default' : 'outline'}>Month</Button>
      <Button onClick={() => onViewChange('week')} variant={view === 'week' ? 'default' : 'outline'}>Week</Button>
      <Button onClick={() => onViewChange('day')} variant={view === 'day' ? 'default' : 'outline'}>Day</Button>
    </div>
  );
}