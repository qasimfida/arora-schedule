export type TaskType = {
    id: number
    title: string
    time: string
    description: string
    status: "pending" | "completed" | "skipped"
}
export interface EmptyStateProps {
    onRestore: () => void
}
export type TaskProps = {
    task: {
        id: number
        title: string
        time: string
        description: string
        status: "pending" | "completed" | "skipped"
    }
    onComplete: () => void
    onSkip: () => void
}

