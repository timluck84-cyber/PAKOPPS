export function CardSkeleton() {
    return (
        <div className="animate-pulse rounded-2xl border border-slate-200 bg-card p-5 dark:border-slate-800">
            <div className="mb-3 flex justify-between">
                <div className="h-4 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
            <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-2 h-4 w-2/5 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-4 h-3 w-3/5 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-5 flex gap-2">
                <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
        </div>
    );
}

export function GridSkeleton({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
    );
}
