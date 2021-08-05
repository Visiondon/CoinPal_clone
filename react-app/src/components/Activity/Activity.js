import './Activity.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTransactions, deleteTransaction, rejectTransaction} from '../../store/transaction';

const Activity = () => {
    const { user } = useSelector((state) => state.session);
    const transactions = useSelector(state => state.transactions['alltransactions'])
    const id = Number(user.id);

    const history = useHistory();
    const dispatch = useDispatch();

    //useStates
    const [errors, setErrors] = useState([]);
    const [switcher, setSwitcher] = useState(false);

    const cancelReq = async (id, transactionId) => {
      const result = await dispatch(deleteTransaction(id,transactionId))

      setSwitcher((prev) => !prev)

      if (result){
        if(result.errors){
          let errs = Object.keys(result.errors)
          setErrors(errs)
        } 
      } 
    }

    const rejectReq = async (id, transactionId) => {
      const result = await dispatch(rejectTransaction(id,transactionId))

      setSwitcher((prev) => !prev)
      
      if (result){
        if(result.errors){
          let errs = Object.keys(result.errors)
          setErrors(errs)
        } else {
          history.push('/');
        }
      } 
    }

    const numToMonth = (num) => {

      const months = ['', 'Jan',	'Feb', 'Mar',	'Apr', 'May',	'Jun', 'Jul',	'Aug', 'Sep', 'Oct', 'Nov',	'Dec'];

      return months[num];
    }

    const transactionStatLogo = (status) => {
      switch(status){
        case 1:
          return 'https://user-images.githubusercontent.com/73211975/128391094-bd6bc2f3-5e3e-4a35-9577-22e26648d83d.png'
          
        case 2:
          return 'https://user-images.githubusercontent.com/73211975/128391722-71b228b4-d84c-41c4-93b9-843d72079565.png'

        case 3:
          return 'https://user-images.githubusercontent.com/73211975/128392440-f771136b-3f72-4baa-ab57-8c87604a5586.png'

        default:
          return 'https://user-images.githubusercontent.com/73211975/128391496-c2a42f69-bfe1-4deb-9ffb-660021b70e21.jpg'
      }

    }

    //useEffets
    useEffect(() => {
      dispatch(getAllTransactions(id));
    }, [dispatch, id, switcher])
    

    const canCancel = (transaction) => {
      if((transaction.transaction_status === 3) && (transaction.from_user_id === id)) return true
      return false
    }
    const canReject = (transaction) => {
      if((transaction.transaction_status === 3) && (transaction.to_user_id === id)) return true
      return false
    }

    return(
      <div className='parent_page'>
        <div className='Activity_page'>
          {errors && errors.forEach(err => {
            <li className='errors__class'>{err}</li>
          })}
            { transactions && transactions.map((transact, idx) => {
                  return (
                    <div className="Activity__main">
                      <img className='transaction_logo' alt='logo' src={transactionStatLogo(transact.transaction_status)}/>
                      <div className="transaction__container" key={idx} value={transact.transaction_id}>
                          <p className='transaction__status'>{transact.transaction_status === 0 ? 'Pending': transact.transaction_status === 1 ? 'Completed' : transact.transaction_status === 2 ? 'Rejected' : transact.transaction_status === 3 ? 'Request' : 'Loading...'}</p>
                              <div>
                                  <p className={'transact_from_user'}>From: {transact.from_user_id}</p>
                                  <p className={'transact_to_user'}>To: {transact.to_user_id}</p>
                                  <p className={'transact_amount'}>Amount: {transact.amount}</p>
                                  <p className={'transact_type'}>Crypto: {transact.crypto_type}</p>
                                  <p className={'transact_type'}>time: {`${numToMonth(transact.date.month)} ${transact.date.day} ${transact.date.year}` }</p>
                              </div>
                          <button style={{visibility: canCancel(transact) ? 'visible': 'hidden'}} onClick={() => cancelReq(id, transact.transaction_id)}>cancel request</button>
                          <button style={{visibility: canReject(transact) ? 'visible': 'hidden'}} onClick={() => rejectReq(id, transact.transaction_id)}>reject request</button>
                      </div>
                    </div>
                  )
              })
            }
        </div>
      </div>
    )
}
  
  
export default Activity;