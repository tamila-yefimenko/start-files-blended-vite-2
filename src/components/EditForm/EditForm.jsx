import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import style from './EditForm.module.css';

const EditForm = ({ onUpdate, onClose, defaultValue }) => {
  const handleEditSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const inputValue = form.elements.text.value;
    onUpdate(inputValue);

    form.reset();
  };
  return (
    <form className={style.form} onSubmit={handleEditSubmit}>
      <button className={style.submitButton} type="submit">
        <RiSaveLine color="green" size="16px" />
      </button>

      <button className={style.editButton} type="button" onClick={onClose}>
        <MdOutlineCancel color="red" size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="text"
        required
        defaultValue={defaultValue}
        autoFocus
      />
    </form>
  );
};
export default EditForm;
