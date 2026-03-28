export function FourChoiceGrid({children}){
    return <>
        <div className="flex justify-center h-screen max-h-(30vh)">
            <div className="grid grid-cols-2 max-h-[60vw] gap-14 w-2/3 h-2/3 mt-15">
                {children}
            </div>
        </div>
    </>
}