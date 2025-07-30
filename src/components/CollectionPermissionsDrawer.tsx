export default function CollectionPermissionsDrawer({
  isOpen,
  onClose,
  collection,
}: {
  isOpen: boolean;
  onClose: () => void;
  collection: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "400px",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.9)",
        color: "white",
        padding: "20px",
        zIndex: 1300,
      }}
    >
      <h3>Collection Permissions: {collection}</h3>
      <p>Permissions drawer placeholder - coming soon!</p>
      <button onClick={onClose} style={{ marginTop: "20px" }}>
        Close
      </button>
    </div>
  );
}
