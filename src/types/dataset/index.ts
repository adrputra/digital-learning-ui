/* eslint-disable @typescript-eslint/no-unused-vars */
interface Dataset {
    username: string
    dataset: string
    created_at: string
    updated_at: string
}

interface ModelTraingingHistory {
    id: string
    institution_id: string
    status: string
    is_used: string
    created_at: string
    created_by: string    
}

interface FilterModelTrainingHistory {
    institution_id: string
    status: string
    is_used: string
    order_by: string
    sort_type: string
}