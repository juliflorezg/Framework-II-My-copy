import React from 'react'

export enum NavigatorType {
  stack = 'Stack',
  drawer = 'Drawer',
  tab = 'Tab',
  component = 'Component',
}
export interface RouteConfig {
  isAuth?: boolean
  icons?: {
    [key: string]: React.ReactNode
  }
  ui?: {
    [key: string]: React.ReactNode
  }
}

export interface Route {
  rootType?: NavigatorType
  initialRouteName?: string
  options?: any 
  prefixes?: string[]
  screens: Record<string, RouteScreen>
}

export interface RouteScreen {
  type: NavigatorType
  path?: string
  exact?: boolean
  initialRouteName?: string
  unMountIfIsAuthenticated?: boolean
  screens?: Record<string, RouteScreen>
  // options?: any
  // options?: {}
  // options?: unknown
  options?: object
}

export interface StackProps {
  screens: Record<string, RouteScreen>
  screenName: string
  navigator?: any
}

// export interface BlockComponent<P = any> {
export interface BlockComponent<P = unknown> {
  children: Partial<BlockComponent>[]
  props: P
  componentName: string
}

export interface Block {
  [x: string]: Partial<BlockComponent>
}

export type EngineProps = {
  routes: Route
  blocks: BlockComponent
  rawHooks: any
}
