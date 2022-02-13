//import React from 'react';
import * as qs from 'qs'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect,useState } from "react"
import { cleanObject, useDebounce, useMount } from '../../utils';
import { useHttp } from '../../utils/http';

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name:'',
        personId:'' 
    })
    const debouncedParam = useDebounce(param, 200)
    const [list, setList] = useState([])
    const client = useHttp()

    useEffect(() => {
        client('projects', {data: cleanObject(debouncedParam)}).then(setList)
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
        //     if(response.ok){
        //         setList(await response.json())
        //     }
        // })
    }, [client, debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if(response.ok){
        //         setUsers(await response.json())
        //     }
        // })
    })

    return <div>
        <SearchPanel param={param} setParam = {setParam} users={users}/>
        <List users={users} list={ list }/>
    </div>
}