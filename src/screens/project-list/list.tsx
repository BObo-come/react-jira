//import React from 'react';

import { User } from "./search-panel"
import {Table, TableProps} from 'antd'
import dayjs from "dayjs"
import { ProjectListScreen } from "."
// react-router 和 react-router-dom的关系 类似于react和 react-dom/react-native/react-vr...
import { Link } from "react-router-dom"
export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created:number;
}

interface ListProps extends TableProps<Project>{
    // list: Project[];
    users: User[];
}

export const List = ({ users, ...props}:ListProps) => {
    return <Table rowKey={"id"} pagination={false} columns={[
    {
        title:'名称',
        // dataIndex:'name',
        sorter:(a, b) => a.name.localeCompare(b.name),
        render(value, project) {
            return <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
        }
    },{
        title:'部门',
        dataIndex:'organization',
    },
    {
        title:'负责人',
        render(value,project){
            return <span>
                { users.find( user => user.id === project.personId)?.name || '未知' }
            </span>
        }
    },{
        title:'创建时间',
        render(value,project){
            return <span>
                { project.created ? dayjs(project.created).format('YYYY-MM-DD'):'无' }
            </span>
        }
    }
    ]} 
    {...props}
    />
        {/* <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => <tr key={project.id}>
                    <td>{ project.name }</td>
                    <td>{ users.find( user => user.id === project.personId)?.name || '未知' }</td>
                </tr>)
            }
        </tbody>
    </Table> */}
}