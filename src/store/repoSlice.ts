import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Repo } from '../@types/repo'

export interface RepoGetterState {
  repos: Repo[]; // список репозитариев лимитированный по per_age 
  total_count: number; // сколько всего репозитариев
  currRepo: Repo | null; // выбарнный репозитарий для просмотра деталей
  query: string // строка для поиска репозитариев
}

const initialState: RepoGetterState = {
  repos: [],
  total_count: 0,
  currRepo: null ,
  query: ""
}

export const get_repos = createAsyncThunk(
  'getter/getRepos',
  async (arg: {page: number, query: string, sort: string, order: string, per_page: number}, thunkApi) => {
    const repos = await fetch(`https://api.github.com/search/repositories?q={${arg.query}}&sort=${arg.sort}&order=${arg.order}&page=${arg.page}&per_page=${arg.per_page}`)  
    .then(
      res => res.json()
    )
    .then(
      data => { return data }
    )

    return {repos: repos, total: repos.total_count};
  }
)

export const repoGetterSlice = createSlice({
  name: 'getter',
  initialState,
  reducers: {
    append: (state, action: PayloadAction<Repo>) => {
      state.repos.push(action.payload)
    },
    clear: state => {
      state.repos = []
    },
    set_curr_repo: (state, action: PayloadAction<number>) => {
      state.currRepo = state.repos[action.payload]
    },
    set_curr_query: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(get_repos.fulfilled, (state, action) => {
      state.repos = []

      var repos = action.payload.repos
      var total = action.payload.total

      repos.items.forEach((repo: any, index: number) => {
        try {
          state.repos.push({
            name: repo.name,
            description: repo.description,
            forks: repo.forks,
            language: repo.language,
            license: repo.license ? repo.license.name : "No license",
            stars: repo.stargazers_count,
            updated: new Date(repo.updated_at),
            topics: repo.topics
          })
        }
        catch(e) {
          console.log(index, e)
        }
      })   

      state.total_count = total
    })
  }
})

export const { append, clear, set_curr_repo, set_curr_query } = repoGetterSlice.actions

export default repoGetterSlice.reducer