import { useState } from "react";
import type {
  EditTechCardData,
  LearningStatus,
  TechCardData,
} from "../types/tech-card";
import { LEARNING_STATUSES } from "../types/tech-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardAction,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PinIcon } from "lucide-react";

type TechCardProps = {
  techCard: TechCardData;
  onDelete: (id: number) => void;
  onUpdate: (id: number, status: LearningStatus) => void;
  onEdit: (id: number, techCardData: EditTechCardData) => void;
  onToggle: (id: number) => void;
};

export default function TechCard({
  techCard,
  onDelete,
  onUpdate,
  onEdit,
  onToggle,
}: TechCardProps) {
  const handleDelete = () => {
    onDelete(techCard.id);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(techCard.title);
  const [draftSummary, setDraftSummary] = useState(techCard.summary);

  const handleEdit = () => {
    setDraftTitle(techCard.title);
    setDraftSummary(techCard.summary);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraftTitle(techCard.title);
    setDraftSummary(techCard.summary);
    setIsEditing(false);
  };

  const handleSave = () => {
    const newTitle = draftTitle.trim();
    const newSummary = draftSummary.trim();

    if (newTitle === "" || newSummary === "") return;
    onEdit(techCard.id, {
      title: newTitle,
      summary: newSummary,
    });

    setIsEditing(false);
  };

  return (
    <li>
      <Card size="sm" className="h-full">
        <CardHeader>
          <CardTitle>
            {isEditing ? (
              <Input
                aria-label={`${techCard.title}のタイトルを編集`}
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
              />
            ) : (
              <Link href={`/cards/${techCard.id}`}>
                <h3 className="rounded-md px-3 py-2 font-semibold">
                  {techCard.title}
                </h3>
              </Link>
            )}
          </CardTitle>

          <CardDescription>
            {isEditing ? (
              <Textarea
                value={draftSummary}
                aria-label={`${techCard.title}の概要を編集`}
                onChange={(e) => setDraftSummary(e.target.value)}
              />
            ) : (
              <p>概要：{techCard.summary}</p>
            )}
          </CardDescription>
          <CardAction className="flex items-center gap-2">
            <Badge variant="secondary">カテゴリ：{techCard.category}</Badge>

            <Button
              type="button"
              size={"icon"}
              variant={techCard.isPinned ? "secondary" : "ghost"}
              aria-pressed={techCard.isPinned}
              aria-label={
                techCard.isPinned
                  ? `${techCard.title}のピン留めを解除`
                  : `${techCard.title}をピン留め`
              }
              title={techCard.isPinned ? "ピン留めを解除" : "ピン留め"}
              onClick={() => onToggle(techCard.id)}
            >
              <PinIcon
                aria-hidden="true"
                className={techCard.isPinned ? "fill-current" : undefined}
              />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <NativeSelect
            aria-label={`${techCard.title}の学習状況`}
            className="w-full"
            value={techCard.learningStatus}
            onChange={(e) =>
              onUpdate(techCard.id, e.target.value as LearningStatus)
            }
          >
            {LEARNING_STATUSES.map((status) => (
              <NativeSelectOption key={status} value={status}>
                {status}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
                  aria-label={`${techCard.title}の削除ボタン`}
                  variant="destructive"
                  type="button"
                >
                  削除
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  「{techCard.title}」を削除しますか？
                </AlertDialogTitle>
                <AlertDialogDescription>
                  この操作は元に戻せません。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleDelete}>
                  削除する
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {!isEditing ? (
            <Button
              aria-label={`${techCard.title}の編集ボタン`}
              variant="outline"
              type="button"
              onClick={handleEdit}
            >
              編集
            </Button>
          ) : (
            <>
              <Button
                aria-label={`${techCard.title}のキャンセルボタン`}
                variant="ghost"
                type="button"
                onClick={handleCancel}
              >
                キャンセル
              </Button>
              <Button
                aria-label={`${techCard.title}の保存ボタン`}
                type="button"
                onClick={handleSave}
              >
                保存
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </li>
  );
}
