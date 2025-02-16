"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskFiltersProps {
  filter: string
  sort: string
  onFilterChange: (value: string) => void
  onSortChange: (value: string) => void
}

export function TaskFilters({ filter, sort, onFilterChange, onSortChange }: TaskFiltersProps) {
  return (
    <div className="mb-4 flex justify-between items-center">
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="ステータスで絞り込む" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">すべて</SelectItem>
          <SelectItem value="incomplete">完了していないもの</SelectItem>
          <SelectItem value="not-started">未着手</SelectItem>
          <SelectItem value="in-progress">進行中</SelectItem>
          <SelectItem value="completed">完了</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="並び替え" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="priority">優先度</SelectItem>
          <SelectItem value="name">タスク名</SelectItem>
          <SelectItem value="category">カテゴリー</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
