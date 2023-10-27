import FlashcardSetGroupModel from "../types/FlashcardSetGroupModel";

const selectGroup = (
    group: FlashcardSetGroupModel,
    groupId: string
): FlashcardSetGroupModel | undefined => {
    if (group.id === groupId) {
        return group;
    }
    if (!group.childGroups) {
        return;
    }
    for (const childGroup of group.childGroups) {
        const foundGroup = selectGroup(childGroup, groupId);
        if (foundGroup) {
            return foundGroup;
        }
    }
};

const selectParentGroup = (
    group: FlashcardSetGroupModel,
    groupId: string
): FlashcardSetGroupModel | undefined => {
    if (!group.childGroups) {
        return;
    }
    for (const childGroup of group.childGroups) {
        if (childGroup.id === groupId) {
            return group;
        }
        const foundGroup = selectParentGroup(childGroup, groupId);
        if (foundGroup) {
            return foundGroup;
        }
    }
};

export default {
    selectGroup,
    selectParentGroup,
}