//import React from 'react';

import { User } from "./search-panel"
import {Dropdown, Menu, Table, TableProps} from 'antd'
import dayjs from "dayjs"
// import { ProjectListScreen } from "."
// react-router 和 react-router-dom的关系 类似于react和 react-dom/react-native/react-vr...
import { Link } from "react-router-dom"
import { Pin } from "../../components/pin"
import { useEditProject } from "../../utils/project"
import { ButtonNoPadding } from "../../components/lib"
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created:number;
}

interface ListProps extends TableProps<Project>{
    // list: Project[];
    users: User[],
    refresh?: () => void,
    projectButton: JSX.Element
}

export const List = ({ users, ...props}:ListProps) => {
    const {mutate} = useEditProject()
    // const pinProject = (id:number,pin:boolean) => mutate({id,pin})
    const pinProject = (id:number) => (pin:boolean) => mutate({id,pin}).then(props.refresh) //柯里化写法
    return <Table rowKey={"id"} pagination={false} columns={[
        {
            title:<Pin checked={true} disabled={true}/>,
            render(value, project) {
                return <Pin checked={project.pin} 
                onCheckedChange={pinProject(project.id)
                // onCheckedChange={pin => {
                //     pinProject(project.id,pin)
                //     // mutate({id:project.id,pin})
                // }
            } />
            }
        },
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
        },{
            render(value, project){
                return <Dropdown overlay={<Menu>
                    <Menu.Item key={'edit'}>
                        {props.projectButton}
                        {/* <ButtonNoPadding type="link" onClick={() => props.setProjectModalOpen(true)}>编辑</ButtonNoPadding> */}
                    </Menu.Item>
                </Menu>}>
                    <ButtonNoPadding type="link">...</ButtonNoPadding>
                </Dropdown>
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