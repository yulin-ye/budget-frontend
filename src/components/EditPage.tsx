import '../styles/EditPage.scss';
import { FaCoffee, FaHamburger, FaWineGlass} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { upsertUserExpense } from '../utils/helpers';
import { IconType } from 'react-icons';
import { IconComponents } from '../types/types';

export default function EditPage () {
  type inputStatusType = { [key:string]: boolean }
  const [inputStatus, setInputStatus] = useState<inputStatusType>({coffee: false, food: false, alcohol: false});
  type inputStateType = { [key:string]: number }
  const [inputState, setInputState] = useState<inputStateType>({coffee: 0, food: 0, alcohol: 0});
  const [isWarningShown, setIsWarningShown] = useState(false);
  const icons:IconComponents = {
    coffee: FaCoffee,
    food: FaHamburger,
    alchohol: FaWineGlass,
  }
  const userId = 101010;

  const validateInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt(event.target.value);
    const id = event.target.id;

    if (value < 1 || value > 100 ) {
      setInputStatus({...inputStatus, [id]: true});
    } else {
      setInputStatus({...inputStatus, [id]: false});
    }
    if (value) {
      setInputState({...inputState, [id]: value});
    } else {
      setInputState({...inputState, [id]: 0});
    }
  }

  const handleSubmit = () => {
    if (Object.values(inputStatus).every(value => !value)) {
      setIsWarningShown(false);

      const params = {
        userId,
        expenseData: {
          ...inputState,
        }
      };

      upsertUserExpense(userId, params).then(() => navigate('/'));
      return;
    }
    setIsWarningShown(true);
  }

  const navigate = useNavigate();
  return (
    <div className='edit-page'>
      <div>
        <h2>How much did I spend today?</h2>
        <div>
          {
            Object.entries(icons).map(([key, value]) => {
              const Icon:IconType = value;
              return (
                <div key={key}>
                  <div className='item'>
                    <div>
                      <span>{`${key}`}</span>
                      <span className='icon'><Icon/></span>
                    </div>
                    <input id={key} type='number' className={inputStatus[key] ? 'error': ''} onChange={validateInput}/>
                  </div>
                  {inputStatus[key] ? (<span className='warning'>Expense amount should be between $1 and $100</span>) : ''}
                </div>
              )
            })
          }
        </div>
        <div className='button-panel'>
          <button className='button' onClick={() => navigate('/')}>Back</button>
          <button className='button' onClick={handleSubmit}>Add Expense</button>
        </div>
        { isWarningShown ? (<p className='warning'>There is input error!</p>) : '' }
      </div>
    </div>
  )
}