//import React from 'react';
// import * as qs from 'qs'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
// import { useEffect,useState } from "react"
import { useState } from "react"
// import { cleanObject, useDebounce, useMount } from '../../utils';
// import { useHttp } from '../../utils/http';
import { useDebounce, useDocumentTitle } from '../../utils';
import styled from '@emotion/styled';
import { Typography } from 'antd';
// import { useAsync } from '../../utils/use-async';
// import { Project } from './list'
import { useProjects } from '../../utils/project';
import { useUsers } from '../../utils/user';
import { Helmet } from "react-helmet";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectsSearchParams } from "./util";

// const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    useDocumentTitle('项目列表',false)
    // const [users, setUsers] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState<null | Error>(null)
    // const [, setParam] = useState({
    //     name:'',
    //     personId:'' 
    // })
    // const [keys,setKeys] = useState<('name'|'personId')[]>(['name','personId'])
    // const [param,setParam] = useUrlQueryParam(keys)
    // const projectsParam = {...param, personId: Number(param.personId)||undefined}
    const [param,setParam] = useProjectsSearchParams()
    const debouncedParam = useDebounce(param, 200)
    // const [list, setList] = useState([])
    // const client = useHttp()
    // const {run,isLoading,error,data:list} = useAsync<Project[]>()
    const {isLoading,error,data:list,retry} = useProjects(debouncedParam)
    // useEffect(() => {
    //     run(client('projects', {data: cleanObject(debouncedParam)}))
        // setIsLoading(true)
        // client('projects', {data: cleanObject(debouncedParam)})
        // .then(setList)
        // .catch( error => {
        //     setList([])
        //     setError(error)
        // })
        // .finally(()=> {
        //     setIsLoading(false)
        // })
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
        //     if(response.ok){
        //         setList(await response.json())
        //     }
        // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [debouncedParam])

    // useMount(() => {
    //     client('users').then(setUsers)
    //     // fetch(`${apiUrl}/users`).then(async response => {
    //     //     if(response.ok){
    //     //         setUsers(await response.json())
    //     //     }
    //     // })
    // })
    const {data:users} = useUsers()

    return <Container>
        {/* <Helmet>
            <title>项目列表</title>
        </Helmet> */}
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam = {setParam} users={users||[]}/>
        {error?<Typography.Text type='danger'>{error.message}</Typography.Text>:null}
        <List refresh={retry} loading={isLoading} users={users||[]} dataSource={ list || [] }/>
    </Container>
}

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
    padding:3.2rem
`