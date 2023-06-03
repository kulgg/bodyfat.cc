import { Entry, Sex } from "@/lib/model";

export interface HistoryEntryProps {
  entry: Entry;
}

function HistoryEntry({ entry }: HistoryEntryProps) {
  return (
    <div
      key={entry.created.getUTCMilliseconds()}
      className="flex items-center justify-between"
    >
      <div>{entry.created.toLocaleDateString()}</div>
      <div className="flex items-center gap-2">
        <div>{entry.measurement.sex === Sex.FEMALE ? "👩" : "👨"}</div>
        <div>{entry.measurement.height}cm</div>
        <div>{entry.measurement.weight}kg</div>
        <div>{entry.measurement.neck}cm</div>
        {entry.measurement.belly ? (
          <div>{entry.measurement.belly}cm</div>
        ) : null}
        {entry.measurement.waist ? (
          <div>{entry.measurement.waist}cm</div>
        ) : null}
        {entry.measurement.hip ? <div>{entry.measurement.hip}cm</div> : null}
      </div>
    </div>
  );
}

export default HistoryEntry;
