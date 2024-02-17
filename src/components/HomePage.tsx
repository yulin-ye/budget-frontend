import { useEffect, useState } from 'react';
import { getTodayExpense, getAvgExpense, getDiffExpense } from '../utils/helpers';
import { FaCoffee, FaHamburger, FaWineGlass} from "react-icons/fa";
import '../styles/HomePage.scss';
import { IconType } from 'react-icons';
import { IconComponents } from '../types/types';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  type expenseType = { [key:string]: number};
  const [userAvgExpense, setUserAvgExpense] = useState<expenseType>({});
  const [diffs, setDiffs] = useState<expenseType>({});
  const [expensesAdded, setExpensesAdded] = useState(false);
  const navigate = useNavigate();
  const userId = 101010;

  const icons:IconComponents = {
    coffee: FaCoffee,
    food: FaHamburger,
    alchohol: FaWineGlass,
  }

  useEffect(() => {
    getTodayExpense(userId).then((data) => {
      if (Object.values(data).length === 3) {
        setExpensesAdded(true);
      }
    });
    getAvgExpense(userId).then((data) => {
      setUserAvgExpense(data);
    });
    getDiffExpense(userId).then(data => {
    console.log('diff',data)
     setDiffs(data);
    });
  }, []);

  const getChangeMessage = (change: number) => {
    if (change === 0 || change === undefined) {
      return 'No change';
    } else if (change > 0) {
      return (<span className='red'>{`${change}% above average`}</span>);
    } else {
      return (<span className='green'>{`${change}% below average`}</span>);
    }
  }

  return (
    <div className="home-page">
      <div className="content">
        <div className='left-panel'>
          <div className='left-panel_title'><h2>Am I spending too much?</h2></div>

          {Object.entries(icons).map(([key,value]) => {
            const Icon:IconType = value;
            return (
              <div className='left-panel_item' key={key}>
                  <div>
                    <span>{`${key}`}</span>
                    <span className='icon'><Icon/></span>
                  </div>
                  <div>
                    <div>{userAvgExpense[key] ? `$${userAvgExpense[key]}/week`: 'No expense yet'}</div>
                    <div>{getChangeMessage(diffs[key])}</div>
                  </div>
              </div>);
          })}
        </div>
        <div className='right-panel'>
          <button className='right-panel_button' onClick={() => navigate('/edit')}>{ expensesAdded ? 'Edit Expense' : 'Add Expense'}</button>
        </div>
      </div>
    </div>
  );
}
