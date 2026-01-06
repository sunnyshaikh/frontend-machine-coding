interface FileType {
  id: string;
  name: string;
  isFolder: boolean;
  items?: FileType[];
}

export const file: FileType = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "public",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "config.json",
          isFolder: false,
        },
      ],
    },
    {
      id: "4",
      name: "src",
      isFolder: true,
      items: [
        {
          id: "5",
          name: "App.tsx",
          isFolder: false,
        },
        {
          id: "6",
          name: "main.tsx",
          isFolder: false,
        },
        {
          id: "7",
          name: "index.css",
          isFolder: false,
        },
      ],
    },
    {
      id: "8",
      name: "package.json",
      isFolder: false,
    },
    {
      id: "9",
      name: "index.html",
      isFolder: false,
    },
  ],
};
