import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Page() {
    const roles = [
        { label: "Admin", value: "admin" },
        { label: "Cashier", value: "cashier" }
    ]

    return (
        <>
            <div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">New User</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Add a new team member.</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>User Details</CardTitle>
                        <CardDescription>Fill in the information below to create a new user.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action="" autoComplete="off" className="space-y-4">
                            <FieldGroup className="grid grid-cols-none gap-4 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="input-field-username">
                                        Name
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input type="text" placeholder="e.g. Sim Kimheang"/>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="input-field-username">Email</FieldLabel>
                                    <Input type="text" placeholder="e.g. emma@example.com"/>
                                </Field>
                            </FieldGroup>
                            <FieldGroup className="grid grid-cols-none gap-4 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="input-field-username">
                                        Password
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input type="text" placeholder="******"/>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="input-field-username">
                                        Confirm Password
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Input type="text" placeholder="******"/>
                                </Field>
                            </FieldGroup>
                            <FieldGroup className="grid grid-cols-none gap-4 sm:grid-cols-2">
                                <Field>
                                    <FieldLabel htmlFor="input-field-username">
                                        Phone Number
                                    </FieldLabel>
                                    <Input type="text" placeholder="e.g. 012345678"/>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="input-field-username">
                                        Role
                                        <span className="text-destructive">*</span>
                                    </FieldLabel>
                                    <Select items={roles} defaultValue="Admin">
                                        <SelectTrigger id="form-country">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            {roles.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                                </SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </FieldGroup>
                            <FieldGroup className="grid grid-cols">
                                <Field>
                                    <FieldLabel htmlFor="input-field-username">Permissions</FieldLabel>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="">
                                            <h4 className="text-sm font-medium text-muted-foreground">Users</h4>
                                            
                                        </div>
                                        

                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-muted-foreground">Users</h4>
                                            <div className="flex items-center gap-2 space-y-0">
                                                <FieldGroup>
                                                    <Field orientation="horizontal">
                                                        <Checkbox id="manage-users"/>
                                                        <FieldLabel htmlFor="manage-users">View</FieldLabel>
                                                    </Field>
                                                </FieldGroup>
                                            </div>
                                            <div className="flex items-center gap-2 space-y-0">
                                                <FieldGroup>
                                                    <Field orientation="horizontal">
                                                        <Checkbox id="view-users"/>
                                                        <FieldLabel htmlFor="view-users">Create</FieldLabel>
                                                    </Field>
                                                </FieldGroup>
                                            </div>
                                            <div className="flex items-center gap-2 space-y-0">
                                                <FieldGroup>
                                                    <Field orientation="horizontal">
                                                        <Checkbox id="view-users"/>
                                                        <FieldLabel htmlFor="view-users">Update</FieldLabel>
                                                    </Field>
                                                </FieldGroup>
                                            </div>
                                            <div className="flex items-center gap-2 space-y-0">
                                                <FieldGroup>
                                                    <Field orientation="horizontal">
                                                        <Checkbox id="view-users"/>
                                                        <FieldLabel htmlFor="view-users">Delete</FieldLabel>
                                                    </Field>
                                                </FieldGroup>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-muted-foreground">Customers</h4>
                                            <div className="flex items-center gap-2 space-y-0">
                                                <FieldGroup>
                                                    <Field orientation="horizontal">
                                                        <Checkbox id="manage-customers"/>
                                                        <FieldLabel htmlFor="manage-customers">Manage Customers</FieldLabel>
                                                    </Field>
                                                </FieldGroup>
                                            </div>
                                            <div className="flex items-center gap-2 space-y-0">
                                                <FieldGroup>
                                                    <Field orientation="horizontal">
                                                        <Checkbox id="view-customers"/>
                                                        <FieldLabel htmlFor="view-customers">View Customers</FieldLabel>
                                                    </Field>
                                                </FieldGroup>
                                            </div>
                                        </div>
                                    </div>
                                </Field>   
                            </FieldGroup>
                            <div className="flex items-center pt-2 gap-3">
                                <Button variant="default" type="submit">Create User</Button>
                                <Button variant="secondary" type="submit">Cancel</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
