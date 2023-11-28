export interface IContact {
    id: number
    name: string
    first_name: string
    last_name: string
    responsible_user_id: number
    group_id: number
    created_by: number
    updated_by: number
    created_at: number
    updated_at: number
    closest_task_at: any
    is_deleted: boolean
    is_unsorted: boolean
    custom_fields_values: CustomFieldsValue[]
    account_id: number
    _links: Links
    _embedded: Embedded
  }
  
  export interface CustomFieldsValue {
    field_id: number
    field_name: string
    field_code: string
    field_type: string
    values: Value[]
  }
  
  export interface Value {
    value: string
    enum_id: number
    enum_code: string
  }
  
  export interface Links {
    self: Self
  }
  
  export interface Self {
    href: string
  }
  
  export interface Embedded {
    tags: any[]
    companies: any[]
  }
  