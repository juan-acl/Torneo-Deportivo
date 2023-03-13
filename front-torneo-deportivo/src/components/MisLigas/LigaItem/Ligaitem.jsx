function LigaItem ({item}) {
  return (
  <>
      <div className="text-center p-3" >
      <div class="card" style={{width: '18rem', background: '#000', color: '#fff'}}>
  <div class="card-body">
    <h2 class="card-title" style={{marginTop: -30}} >{item.name}</h2>
    <a href="#" class="card-link">Update</a>
    <a href="#" class="card-link">Delete</a>
    <a href="#" className="card-link">Teams</a>
  </div>
</div>
</div>
  </>
  )
}

export {LigaItem};
