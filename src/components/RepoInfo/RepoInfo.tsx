import Chip from "@mui/material/Chip"
import StarIcon from '@mui/icons-material/Star';
import { useAppSelector } from "../../@types/hooks"
import { Repo } from "../../@types/repo"
import './style.css'

interface IRepoInfoProps {
  repo: Repo | null
}

export const RepoInfo = () => {
  const currRepo: Repo | null = useAppSelector(state => state.getter.currRepo)
  
  return(
    <div className="repo_info">
    {
      currRepo
      ?
      <div className="info_container">
        <h1>{currRepo?.name}</h1>
        <h3>{currRepo?.description}</h3>
        <div className="highlight">
          <Chip className="chip" label={currRepo?.language} color="primary"/>
          <div className="stars">
            <StarIcon sx={{ color: '#FFB400' }}/>
            <a>{currRepo?.stars}</a>
          </div>
        </div>
        <div className="topics">
          {
            currRepo.topics.map((topic: string, index: number) => (
              <Chip key={index} className="chip" label={topic} />
            ))
          }
        </div>
        <h4 style={{ fontWeight: '400' }}>{currRepo?.license}</h4>
      </div>
      :
      <div className="empty">
        <a>Выберите репозитарий</a>
      </div>
    }
    </div>
  )
}