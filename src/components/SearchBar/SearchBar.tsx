import './style.css'
import { Button, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../@types/hooks'
import { get_repos, set_curr_query } from '../../store/repoSlice'

export const SearchBar = () => {
  const query: string = useAppSelector(state => state.getter.query)
  const dispatch = useAppDispatch()  


  return(
    <div className='search_bar'>
      <TextField 
        InputProps={{
          disableUnderline: true
        }}
        sx={{
          "& fieldset": { border: 'none' }
        }}
        className='input'
        size='small'
        placeholder="Введите поисковый запрос"
        id="search_input" 
        variant="outlined" 
        onChange={(e) => dispatch(set_curr_query(e.target.value))}
      />

      <Button
        variant='contained'
        className='button'
        onClick={() => dispatch(get_repos({page: 1, query: query, sort: "stars", order: "desc", per_page: 10}))}
      >
        ИСКАТЬ
      </Button>
    </div>
  )
}