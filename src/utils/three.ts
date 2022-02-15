export const fetchModelNames = async () => {
  const data = await fetch(
    "https://api.github.com/repositories/576201/contents/examples/models/gltf"
  );

  const gltfData: { name: string }[] = await data.json();

  const modelNames = gltfData.map((data) => {
    const name = data.name.split(".");

    if (name.pop() === "glb") {
      return name[0];
    }
    return null;
  });
  const names = modelNames.filter((name) => {
    return name;
  })!;
  return names;
};
