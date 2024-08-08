import TableCell from "@mui/material/TableCell";
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface ISortCellProps {
  name: string;
  text: string;
  handleChangeSortOrder: Function;
  sortBy: string;
  orderBy: string;
}

/**
 * UI-компонент для отображения заголовков таблицы с возможностью сортировки 
 * @param name - название атрибута заголовка для фильтрации
 * @param text - текст для отображения на кнопке
 * @param handleChangeSortOrder - функция для смены параметров сортировки
 * @param sortBy - имя атрибута по которому фильтруем на данный момент stars/updated/forks 
 * @param orderBy - desc или asc сортировка
 * @returns 
 */
export const SortCell = ({name, text, handleChangeSortOrder, sortBy, orderBy} : ISortCellProps) => {
  return(
    <TableCell>
      {
        sortBy == name
        ?
        <>
        {
          orderBy == "desc"
          ?
          <IconButton aria-label="order-fork" size="medium" onClick={() => handleChangeSortOrder("asc", name)}>
            <ArrowDownwardIcon fontSize="inherit"/>
          </IconButton>
          :
          <IconButton aria-label="order-fork" size="medium" onClick={() => handleChangeSortOrder("", "")}>
            <ArrowUpwardIcon fontSize="inherit"/>
          </IconButton>
        }
        </>
        :
        <IconButton aria-label="order-fork" size="medium" onClick={() => handleChangeSortOrder("desc", name)}>
          <ArrowDownwardIcon fontSize="inherit" color='disabled'/>
        </IconButton>
      }
      {text}
    </TableCell>
  )
}