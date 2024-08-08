import './App.css';
import { RepoList } from './components/RepoList/RepoList';
import { SearchBar } from './components/SearchBar/SearchBar';
import { store } from './store/repo.store'
import { Provider } from 'react-redux'
import { RepoInfo } from './components/RepoInfo/RepoInfo';

function App() {
  return (
    <Provider store={store}>
      <div className='container'>
        <SearchBar />
        <div className='info_frame'>
          <RepoList/>
          <RepoInfo />
        </div>
        <div className='footer'>
          
        </div>
      </div>
    </Provider>
  );
}

export default App;
