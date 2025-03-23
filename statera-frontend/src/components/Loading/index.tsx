import style from "./loading.module.css"

export function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className={style.loader} />
        </div>
    )
}