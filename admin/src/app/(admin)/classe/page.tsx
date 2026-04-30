import {
    Plus
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <>
            <div>
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold tracking-tight">Classes</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Manage fitness classes.</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button><Plus className="h-5 w-5"/>Add Classe</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}