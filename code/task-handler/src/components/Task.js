import {FaTimes} from 'react-icons/fa'


export const Task = ({singleTask, onDelete, onToggle}) => {
  return (
    <div
      className={`task ${singleTask.reminder ? 'reminder' : '' }`}
      onDoubleClick={() => onToggle(singleTask.id)}
    >
      <h3>
        {singleTask.text}
        <FaTimes
          onClick={() => onDelete(singleTask.id)}
          style={{ color: 'red', cursor: 'pointer' }}
        />
      </h3>

      <p>{singleTask.day}</p>
    </div>
  );
}
