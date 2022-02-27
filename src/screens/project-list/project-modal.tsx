import { Button, Drawer } from 'antd'
import React from 'react'

export const ProjectModal = (props:{projetModalOpen: boolean,onClose: () => void}) => {
    return <Drawer onClose = {props.onClose}  visible={props.projetModalOpen} width={'100%'}>
        <h1>Project Modal</h1>
        <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
}