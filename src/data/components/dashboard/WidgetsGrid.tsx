import { DashboardWidget } from '../../types';
import { DashboardWidget as Widget } from './DashboardWidget';

interface WidgetsGridProps {
  widgets: DashboardWidget[];
}

export function WidgetsGrid({ widgets }: WidgetsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {widgets.map((widget) => (
        <Widget key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
