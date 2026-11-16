'use client'

import type {FindSocialLinksQuery} from '@/gql/graphql'
import type {DraggableProvided} from '@hello-pangea/dnd'
import {useTranslations} from "next-intl";
import {useForm} from "react-hook-form";
import {socialLinksSchema, TypeSocialLinksSchema} from "@/schemas/user/social-links.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {GripVertical, Pencil, Trash2} from "lucide-react";
import {
    useFindSocialLinksQuery,
    useRemoveSocialLinkMutation,
    useUpdateSocialLinkMutation
} from "@/graphql/generated/output";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/common/form";
import {Input} from "@/components/ui/common/input";
import {Button} from "@/components/ui/common/button";
import {toast} from "sonner";

interface SocialLinkItemProps {
    socialLink: FindSocialLinksQuery['findSocialLinks'][0]
    provided: DraggableProvided
}

export function SocialLinkItem({socialLink, provided}: SocialLinkItemProps) {
    const t = useTranslations('dashboard.settings.profile.socialLinks.editForm')

    const [editingId, setEditingId] = useState<string | null>(null)

    const {refetch} = useFindSocialLinksQuery()

    const [update, {loading: isLoadingUpdate}] = useUpdateSocialLinkMutation({
        onCompleted() {
            toggleEditing(null)
            refetch()
            toast.success(t('successUpdateMessage'))
        },
        onError() {
            toast.error(t('errorUpdateMessage'))
        }
    })

    const [remove, {loading: isLoadingRemove}] = useRemoveSocialLinkMutation({
        onCompleted() {
            refetch()
            toast.success(t('successRemoveMessage'))
        },
        onError() {
            toast.error(t('errorRemoveMessage'))
        }
    })


    const form = useForm<TypeSocialLinksSchema>({
        resolver: zodResolver(socialLinksSchema),
        values: {
            url: socialLink.url ?? '',
            title: socialLink.title ?? ''
        }
    })

    const {isValid, isDirty} = form.formState

    const toggleEditing = (id: string | null) => {
        setEditingId(id)
    }

    const onSubmit = (data: TypeSocialLinksSchema) => {
        update({variables: {id: socialLink.id, data}})
    }

    return (
        <div
            className='mb-4 flex items-center gap-x-2 rounded-md border border-border bg-background text-sm'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div
                className="rounded-l-md border-r border-r-border px-2 py-9 text-foreground transition">
                <GripVertical className='size-5'/>
            </div>
            <div className="space-y-1 px-2">
                {editingId === socialLink.id ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='flex gap-x-6'
                        >
                            <div className="w-96 space-y-2">
                                <FormField control={form.control}
                                           render={({field}) => (
                                               <FormItem>
                                                   <FormControl>
                                                       <Input
                                                           placeholder='YouTube'
                                                           className='h-8'
                                                           disabled={isLoadingUpdate || isLoadingRemove}
                                                           {...field}
                                                       />
                                                   </FormControl>
                                               </FormItem>
                                           )}
                                           name='title'
                                />
                                <FormField control={form.control}
                                           render={({field}) => (
                                               <FormItem>
                                                   <FormControl>
                                                       <Input
                                                           placeholder='https://youtube.com/@gonchra'
                                                           className='h-8'
                                                           disabled={isLoadingUpdate || isLoadingRemove}
                                                           {...field}
                                                       />
                                                   </FormControl>
                                               </FormItem>
                                           )}
                                           name='url'
                                />
                            </div>
                            <div className="flex items-center gap-x-4">
                                <Button variant='secondary' onClick={() => toggleEditing(null)}>{t('cancelButton')}</Button>
                                <Button disabled={isLoadingUpdate || !isValid || !isDirty || isLoadingRemove}>{t('submitButton')}</Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <>
                        <h2 className='text-base tracking-wide font-semibold text-foreground'>{socialLink.title}</h2>
                        <p className='text-muted-foreground'>{socialLink.url}</p>
                    </>
                )}
            </div>
            <div className="ml-auto mr-1 flex items-center gap-x-2 pr-4">
                {editingId !== socialLink.id && (
                    <Button onClick={() => toggleEditing(socialLink.id)} variant='ghost' size='lgIcon'>
                        <Pencil className='size-4 text-muted-foreground' />
                    </Button>
                )}
                <Button variant='ghost' size='lgIcon' onClick={() => remove({variables: {id: socialLink.id}})}>
                    <Trash2  className='size-4 text-muted-foreground'/>
                </Button>
            </div>
        </div>
    )
}