import './style.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from "../../@types/hooks"
import { Repo } from "../../@types/repo"
import { get_repos, set_curr_repo } from '../../store/repoSlice';
import { useState } from 'react';
import { SortCell } from './SortCell';

export const RepoList = () => {
  const repos: Repo[] = useAppSelector(state => state.getter.repos)
  const query: string = useAppSelector(state => state.getter.query)
  const total: number = useAppSelector(state => state.getter.total_count)

  const dispatch = useAppDispatch()  

  const [currPage, setCurrPage] = useState<number>(0)
  const [orderBy, setOrderBy] = useState<string>("desc")
  // The sort field. One of stars, forks, or updated
  const [sortBy, setSortBy] = useState<string>("stars")
  const [perPage, setPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, new_page: number) => {
    try {
      dispatch(get_repos({page: new_page + 1, query: query, order: orderBy, sort: sortBy, per_page: perPage}))
      setCurrPage(new_page)
    } catch(e) {
      alert(e)
    }
  }

  const handleChangeSortOrder = (order: string, sort: string) => {
    try {
      dispatch(get_repos({page: currPage, query: query, order: order, sort: sort, per_page: perPage}))
      setOrderBy(order)
      setSortBy(sort)
      setCurrPage(0)
    } catch(e) {
      alert(e)
    }
  }

  const handleChangePerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    var new_per_page = parseInt(event.target.value)
    try {
      dispatch(get_repos({page: currPage, query: query, order: orderBy, sort: sortBy, per_page: new_per_page}))
      setPerPage(new_per_page)
      setCurrPage(0)
    } catch(e) {
      alert(e)
    } 
  }

  return(
    <div className="repo_list">
      {
        repos.length == 0
        ?
        <div className='empty_list'>
          <h1>Добро пожаловать</h1>
        </div>
        :
        <>
        <h1>Результаты поиска</h1>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Язык</TableCell>
                <SortCell 
                  handleChangeSortOrder={handleChangeSortOrder} 
                  name={"forks"} text={"Число форков"} 
                  orderBy={orderBy} 
                  sortBy={sortBy} 
                />
                <SortCell 
                  handleChangeSortOrder={handleChangeSortOrder} 
                  name={"stars"} text={"Число звёзд"} 
                  orderBy={orderBy} 
                  sortBy={sortBy} 
                />
                <SortCell 
                  handleChangeSortOrder={handleChangeSortOrder} 
                  name={"updated"} text={"Дата обновления"} 
                  orderBy={orderBy} 
                  sortBy={sortBy} 
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {
                repos.map((repo, index) => (
                  <TableRow
                    hover
                    key={index}
                    onClick={() => dispatch(set_curr_repo(index))}
                  >
                    <TableCell>{repo.name}</TableCell>
                    <TableCell>{repo.language}</TableCell>
                    <TableCell>{repo.forks}</TableCell>
                    <TableCell>{repo.stars}</TableCell>
                    <TableCell>{repo.updated.toLocaleString().split(',')[0]}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={total}
          rowsPerPage={perPage}
          page={currPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangePerPage}
        />      
        </>
      }
    </div>  
  )
}