import FlashcardSetGroupModel from "../types/FlashcardSetGroupModel";

const findGroup = (
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
        const foundGroup = findGroup(childGroup, groupId);
        if (foundGroup) {
            return foundGroup;
        }
    }
};

const findParentGroup = (
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
        const foundGroup = findParentGroup(childGroup, groupId);
        if (foundGroup) {
            return foundGroup;
        }
    }
};

export default {
    findGroup,
    findParentGroup,
}