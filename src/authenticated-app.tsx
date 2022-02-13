import styled from '@emotion/styled'
import { Row } from './components/lib'
import { useAuth } from "./context/auth-context"
import { ProjectListScreen } from "./screens/project-list"
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg'
import { Dropdown, Menu } from 'antd'

/**
 * gird 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发： 先规划网格（数量比较固定），然后再把元素往里填充
 * 从内容出发用flex
 * 从布局出发用grid
 * @returns 
 */
export const AuthenticatedApp = () => {
    const {logout,user} = useAuth()
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                {/* <button onClick={logout}>登出</button> */}
                <Dropdown overlay={<Menu>
                    <Menu.Item key={'logout'}>
                        <a onClick={logout}>登出</a>
                    </Menu.Item>
                </Menu>}>
                    <a onClick={e => e.preventDefault()}>
                        Hi,{user?.name}
                    </a>
                </Dropdown>
            </HeaderRight>
        </Header>
        <Main>
            <ProjectListScreen/>
        </Main>
    </Container>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    height: 100vh;
`;
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow:0 0 5px 0 rgba(0,0,0,0.1);
    z-index:1;
`;
const HeaderLeft = styled(Row)`
    display: flex;
    align-items: center;
`
const HeaderRight = styled.div``;
const Main = styled.main``;
// const PageHeader = styled.header`
//     height: 6rem;
// `
// const Main = styled.main`
//     height:calc(100vh - 6rem)
// `